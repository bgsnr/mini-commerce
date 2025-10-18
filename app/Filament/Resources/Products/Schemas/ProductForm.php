<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('category_id')
                    ->relationship('category', 'name')
                    ->required(),

                TextInput::make('name')
                    ->required(),
                
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('Rp'),

                TextInput::make('stock')
                    ->required()
                    ->numeric()
                    ->default(0),

                FileUpload::make('image')
                    ->label('Product Image')
                    ->required()
                    ->disk('public_images')
                    ->directory('/')
                    ->visibility('public')
                    ->rules(['mimes:jpeg,jpg,png,gif'])
                    ->image(),

                Textarea::make('description')
                    ->columnSpanFull(),

                Toggle::make('is_active')
                    ->label('Is Active?')
                    ->default(true),
            ]);
    }
}