<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'description',
        'stock',
        'price',
        'image',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['image_url']; //

    /**
     * Accessor untuk mendapatkan URL gambar produk secara konsisten.
     *
     * @return string
     */
    public function getImageUrlAttribute(): string
    {
        // Cek jika kolom 'image' ada isinya dan filenya ada di storage
        if (!empty($this->image)) {
            return asset('images/' . $this->image);
        }

        // Jika tidak, berikan gambar placeholder
        return 'https://via.placeholder.com/300x300.png?text=No+Image';
    }
}
