<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\ItemRepositoryInterface;
use App\Repositories\ItemRepository;
use App\Repositories\Interfaces\ItemTypeRepositoryInterface;
use App\Repositories\ItemTypeRepository;
use App\Repositories\Interfaces\TransactionRepositoryInterface;
use App\Repositories\TransactionRepository;
use App\Services\ItemService;
use App\Services\ItemTypeService;
use App\Services\TransactionService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(ItemRepositoryInterface::class, ItemRepository::class);
        $this->app->bind(ItemTypeRepositoryInterface::class, ItemTypeRepository::class);
        $this->app->bind(TransactionRepositoryInterface::class, TransactionRepository::class);

        $this->app->bind(ItemService::class, function ($app) {
            return new ItemService($app->make(ItemRepositoryInterface::class));
        });

        $this->app->bind(ItemTypeService::class, function ($app) {
            return new ItemTypeService($app->make(ItemTypeRepositoryInterface::class));
        });

        $this->app->bind(TransactionService::class, function ($app) {
            return new TransactionService($app->make(TransactionRepositoryInterface::class));
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
