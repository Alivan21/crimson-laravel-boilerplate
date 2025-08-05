<?php

namespace App\Facades;

use App\Services\DataTableService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Facade;

/**
 * @method static DataTableService make(Builder $query) Create a new DataTable instance
 * @method static DataTableService searchable(array $columns) Set searchable columns
 * @method static DataTableService sortable(array $columns) Set sortable columns
 * @method static DataTableService filterable(array $columns) Set filterable columns with their filter types
 * @method static DataTableService with(array $relationships) Set relationships to load
 * @method static DataTableService defaultPerPage(int $perPage) Set default pagination size
 * @method static DataTableService maxPerPage(int $maxPerPage) Set maximum pagination size
 * @method static DataTableService filter(string $key, callable $callback) Add a custom filter callback
 * @method static LengthAwarePaginator get(Request $request) Process the request and return paginated results
 * @method static array getResponse(Request $request) Process the request and return paginated and transformed results
 * @method static Builder getQuery() Get the query builder for custom modifications
 * @method static array toArray(LengthAwarePaginator $paginator) Transform the paginated results to match frontend expectations
 *
 * @see \App\Services\DataTableService
 */
class DataTable extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return DataTableService::class;
    }
}
