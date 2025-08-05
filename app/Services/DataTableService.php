<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * DataTable Service for handling advanced data table operations
 *
 * This service provides a fluent interface for building complex data table queries
 * with search, sorting, filtering, and pagination capabilities.
 *
 * @method static self make(Builder $query) Create a new DataTable instance
 * @method self searchable(array $columns) Set searchable columns
 * @method self sortable(array $columns) Set sortable columns
 * @method self filterable(array $columns) Set filterable columns with their filter types
 * @method self with(array $relationships) Set relationships to load
 * @method self defaultPerPage(int $perPage) Set default pagination size
 * @method self maxPerPage(int $maxPerPage) Set maximum pagination size
 * @method self filter(string $key, callable $callback) Add a custom filter callback
 * @method LengthAwarePaginator get(Request $request) Process the request and return paginated results
 * @method array getResponse(Request $request) Process the request and return paginated and transformed results
 * @method Builder getQuery() Get the query builder for custom modifications
 * @method array toArray(LengthAwarePaginator $paginator) Transform the paginated results to match frontend expectations
 */
class DataTableService
{
    protected Builder $query;
    protected array $searchableColumns = [];
    protected array $sortableColumns = [];
    protected array $filterableColumns = [];
    protected array $relationships = [];
    protected int $defaultPerPage = 10;
    protected int $maxPerPage = 100;

    /**
     * Create a new DataTableService instance
     *
     * @param Builder $query The Eloquent query builder instance
     */
    public function __construct(Builder $query)
    {
        $this->query = $query;
    }

    /**
     * Create a new DataTable instance
     *
     * @param Builder $query The Eloquent query builder instance
     * @return self
     */
    public static function make(Builder $query): self
    {
        return new self($query);
    }

    /**
     * Set searchable columns
     *
     * @param array $columns Array of column names that can be searched
     * @return self
     */
    public function searchable(array $columns): self
    {
        $this->searchableColumns = $columns;
        return $this;
    }

    /**
     * Set sortable columns
     *
     * @param array $columns Array of column names that can be sorted
     * @return self
     */
    public function sortable(array $columns): self
    {
        $this->sortableColumns = $columns;
        return $this;
    }

    /**
     * Set filterable columns with their filter types
     *
     * Available filter types:
     * - 'exact': Exact match
     * - 'like': Case-insensitive LIKE search
     * - 'date': Date comparison
     * - 'date_range': Date range filter (comma-separated)
     * - 'in': IN clause (comma-separated values)
     * - 'boolean': Boolean filter
     * - 'relationship': Filter by relationship
     *
     * @param array $columns Associative array of column => filter_type
     * @return self
     */
    public function filterable(array $columns): self
    {
        $this->filterableColumns = $columns;
        return $this;
    }

    /**
     * Set relationships to load
     *
     * @param array $relationships Array of relationship names to eager load
     * @return self
     */
    public function with(array $relationships): self
    {
        $this->relationships = $relationships;
        return $this;
    }

    /**
     * Set default pagination size
     *
     * @param int $perPage Number of items per page
     * @return self
     */
    public function defaultPerPage(int $perPage): self
    {
        $this->defaultPerPage = $perPage;
        return $this;
    }

    /**
     * Set maximum pagination size
     *
     * @param int $maxPerPage Maximum number of items per page
     * @return self
     */
    public function maxPerPage(int $maxPerPage): self
    {
        $this->maxPerPage = $maxPerPage;
        return $this;
    }

    /**
     * Apply search to the query
     */
    protected function applySearch(string $search): void
    {
        if (empty($this->searchableColumns) || empty($search)) {
            return;
        }

        $this->query->where(function (Builder $query) use ($search) {
            foreach ($this->searchableColumns as $column) {
                if (str_contains($column, '.')) {
                    // Handle relationship searches
                    $parts = explode('.', $column);
                    $relation = $parts[0];
                    $relationColumn = $parts[1];

                    $query->orWhereHas($relation, function (Builder $subQuery) use ($relationColumn, $search) {
                        $this->applyCaseInsensitiveLike($subQuery, $relationColumn, $search);
                    });
                } else {
                    // Direct column search
                    $this->applyCaseInsensitiveLike($query, $column, $search);
                }
            }
        });
    }

    /**
     * Apply case-insensitive LIKE query optimized for the database driver
     */
    protected function applyCaseInsensitiveLike(Builder $query, string $column, string $search): void
    {
        $driver = $query->getConnection()->getDriverName();

        switch ($driver) {
            case 'pgsql':
                // PostgreSQL: Use native ILIKE for optimal performance
                $query->orWhere($column, 'ILIKE', "%{$search}%");
                break;

            case 'sqlite':
                // SQLite: LIKE is case-insensitive by default
                $query->orWhere($column, 'LIKE', "%{$search}%");
                break;

            default:
                // MySQL/MariaDB: Use LOWER() function
                $query->orWhereRaw('LOWER(' . $column . ') LIKE ?', ['%' . strtolower($search) . '%']);
                break;
        }
    }

    /**
     * Apply case-insensitive LIKE query optimized for the database driver
     */
    protected function applyCaseInsensitiveLikeFilter(string $column, string $search): void
    {
        $driver = $this->query->getConnection()->getDriverName();

        switch ($driver) {
            case 'pgsql':
                // PostgreSQL: Use native ILIKE for optimal performance
                $this->query->where($column, 'ILIKE', "%{$search}%");
                break;

            case 'sqlite':
                // SQLite: LIKE is case-insensitive by default
                $this->query->where($column, 'LIKE', "%{$search}%");
                break;

            default:
                // MySQL/MariaDB: Use LOWER() function
                $this->query->whereRaw('LOWER(' . $column . ') LIKE ?', ['%' . strtolower($search) . '%']);
                break;
        }
    }

    /**
     * Apply sorting to the query
     */
    protected function applySorting(?string $sortBy, ?string $direction): void
    {
        if (!$sortBy || !in_array($sortBy, $this->sortableColumns)) {
            return;
        }

        $direction = strtolower($direction) === 'desc' ? 'desc' : 'asc';

        if (str_contains($sortBy, '.')) {
            // Handle relationship sorting
            $parts = explode('.', $sortBy);
            $relation = $parts[0];
            $relationColumn = $parts[1];

            $this->query->with($relation)->orderBy(
                function ($query) use ($relation, $relationColumn) {
                    $query->select($relationColumn)
                        ->from($this->getRelationTable($relation))
                        ->whereColumn(
                            $this->getRelationForeignKey($relation),
                            $this->query->getModel()->getTable() . '.id'
                        );
                },
                $direction
            );
        } else {
            // Direct column sorting
            $this->query->orderBy($sortBy, $direction);
        }
    }

    /**
     * Apply filters to the query
     */
    protected function applyFilters(array $filters): void
    {
        foreach ($filters as $column => $value) {
            if (!isset($this->filterableColumns[$column]) || $value === null || $value === '') {
                continue;
            }

            $filterType = $this->filterableColumns[$column];

            switch ($filterType) {
                case 'exact':
                    $this->query->where($column, $value);
                    break;

                case 'like':
                    $this->applyCaseInsensitiveLikeFilter($column, $value);
                    break;

                case 'date':
                    $this->query->whereDate($column, $value);
                    break;

                case 'date_range':
                    if (str_contains($value, ',')) {
                        [$start, $end] = explode(',', $value);
                        $this->query->whereBetween($column, [trim($start), trim($end)]);
                    }
                    break;

                case 'in':
                    $values = array_map('trim', explode(',', $value));
                    $this->query->whereIn($column, $values);
                    break;

                case 'boolean':
                    $this->query->where($column, filter_var($value, FILTER_VALIDATE_BOOLEAN));
                    break;

                case 'relationship':
                    if (str_contains($column, '.')) {
                        $parts = explode('.', $column);
                        $relation = $parts[0];
                        $relationColumn = $parts[1];

                        $this->query->whereHas($relation, function (Builder $query) use ($relationColumn, $value) {
                            $query->where($relationColumn, $value);
                        });
                    }
                    break;

                default:
                    $this->query->where($column, $value);
                    break;
            }
        }
    }

    /**
     * Get relation table name
     */
    protected function getRelationTable(string $relation): string
    {
        $relationInstance = $this->query->getModel()->{$relation}();
        return $relationInstance->getRelated()->getTable();
    }

    /**
     * Get relation foreign key
     */
    protected function getRelationForeignKey(string $relation): string
    {
        $relationInstance = $this->query->getModel()->{$relation}();
        return $relationInstance->getForeignKeyName();
    }

    /**
     * Process the request and return paginated results
     *
     * This method applies search, filters, sorting, and pagination to the query
     * based on the request parameters.
     *
     * @param Request $request The HTTP request containing search, filter, and pagination parameters
     * @return LengthAwarePaginator The paginated results
     */
    public function get(Request $request): LengthAwarePaginator
    {
        // Load relationships
        if (!empty($this->relationships)) {
            $this->query->with($this->relationships);
        }

        // Apply search
        if ($search = $request->get('search')) {
            $this->applySearch($search);
        }

        // Apply filters
        $filters = $request->except(['search', 'page', 'limit', 'col', 'order']);
        $this->applyFilters($filters);

        // Apply sorting
        $this->applySorting(
            $request->get('col'),
            $request->get('order')
        );

        // Get pagination parameters
        $perPage = min(
            max((int) $request->get('limit', $this->defaultPerPage), 1),
            $this->maxPerPage
        );

        // Paginate results
        $results = $this->query->paginate($perPage);

        // Transform pagination meta for frontend
        $results->appends($request->except('page'));

        return $results;
    }

    /**
     * Process the request and return paginated and transformed results
     *
     * This method processes the request and returns the results in a format
     * optimized for frontend data tables.
     *
     * @param Request $request The HTTP request containing search, filter, and pagination parameters
     * @return array Array containing 'items' and 'meta' keys for frontend consumption
     */
    public function getResponse(Request $request): array
    {
        $paginator = $this->get($request);
        return $this->toArray($paginator);
    }

    /**
     * Get the query builder for custom modifications
     *
     * @return Builder The underlying Eloquent query builder instance
     */
    public function getQuery(): Builder
    {
        return $this->query;
    }

    /**
     * Add a custom filter callback
     *
     * @param string $key The request parameter key to check for
     * @param callable $callback The callback function to apply if the key exists in the request
     * @return self
     */
    public function filter(string $key, callable $callback): self
    {
        if ($value = request($key)) {
            $callback($this->query, $value);
        }

        return $this;
    }

    /**
     * Transform the paginated results to match frontend expectations
     *
     * @param LengthAwarePaginator $paginator The paginated results
     * @return array Array with 'items' and 'meta' structure for frontend data tables
     */
    public function toArray(LengthAwarePaginator $paginator): array
    {
        return [
            'items' => $paginator->items(),
            'meta' => [
                'current_page' => $paginator->currentPage(),
                'first_page_url' => $paginator->url(1),
                'from' => $paginator->firstItem(),
                'last_page' => $paginator->lastPage(),
                'last_page_url' => $paginator->url($paginator->lastPage()),
                'links' => $paginator->linkCollection()->toArray(),
                'next_page_url' => $paginator->nextPageUrl(),
                'path' => $paginator->path(),
                'per_page' => $paginator->perPage(),
                'prev_page_url' => $paginator->previousPageUrl(),
                'to' => $paginator->lastItem(),
                'total' => $paginator->total(),
            ]
        ];
    }
}
