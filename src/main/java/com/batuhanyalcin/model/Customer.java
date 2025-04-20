package com.batuhanyalcin.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customer")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Ad alanı boş olamaz")
    @Size(min = 2, max = 50, message = "Ad 2-50 karakter arasında olmalıdır")
    @Column(name = "firstname")
    private String firstName;

    @NotBlank(message = "Soyad alanı boş olamaz")
    @Size(min = 2, max = 50, message = "Soyad 2-50 karakter arasında olmalıdır")
    @Column(name = "lastname")
    private String lastName;

    @Min(value = 18, message = "Yaş 18'den küçük olamaz")
    @Max(value = 120, message = "Yaş 120'den büyük olamaz")
    @Column(name = "age")
    private int age;

    @NotBlank(message = "Sipariş adı boş olamaz")
    @Size(min = 3, max = 40, message = "Sipariş adı 3-40 karakter arasında olmalıdır")
    @Column(name = "order_name")
    private String orderName;

    @NotEmpty(message = "Ürün listesi boş olamaz")
    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> product = new ArrayList<>();
}
