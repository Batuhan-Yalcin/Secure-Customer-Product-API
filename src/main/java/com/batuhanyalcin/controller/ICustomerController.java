package com.batuhanyalcin.controller;

import com.batuhanyalcin.dto.DtoCustomer;
import com.batuhanyalcin.dto.DtoCustomerIU;

import java.util.List;

public interface ICustomerController {
    public DtoCustomer saveCustomer(DtoCustomerIU dtoCustomerIU);
    public List<DtoCustomer> getAllCustomer();
    public DtoCustomer customerById(Long Id);
    public String deleteCustomer(Long Id);
    public DtoCustomer updateCustomer(Long Id,DtoCustomerIU dtoCustomerIU);
}
