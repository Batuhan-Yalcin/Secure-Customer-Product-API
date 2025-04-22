package com.batuhanyalcin.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoCustomerIU {
    private String firstName;
    private String lastName;
    private int age;
    private String orderName;
    private List<DtoProduct> product = new ArrayList<>();
}
