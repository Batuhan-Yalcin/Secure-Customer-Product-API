package com.batuhanyalcin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Ürün adı boş olamaz")
    @Size(min = 2, max = 40, message = "Ürün adı 2-40 karakter arasında olmalıdır")
    @Column(name = "product_name")
    private String name;

    @Min(value = 0, message = "Fiyat 0'dan küçük olamaz")
    @Column(name = "price")
    private int price;
}
