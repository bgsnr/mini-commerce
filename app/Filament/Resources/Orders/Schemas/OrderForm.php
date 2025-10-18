<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'shipped' => 'Shipped',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required(),

                TextInput::make('recipient_name')
                    ->label('Customer Name')
                    ->disabled() 
                    ->dehydrated(false),

                TextInput::make('total')
                    ->label('Total Price')
                    ->numeric()
                    ->prefix('Rp')
                    ->disabled() 
                    ->dehydrated(false),
            ]);
    }
}