<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class DataTable extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'App\Services\DataTableService';
    }
}
