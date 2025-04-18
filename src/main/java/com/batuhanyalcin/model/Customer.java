package com.batuhanyalcin.model;

import jakarta.persistence.*;
import lombok.*;

import javax.lang.model.element.Name;
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
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
    @Column(name="age")
    private int age;
    @Column(name = "order_name")
    private String orderName;
    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> product = new ArrayList<>();
}
