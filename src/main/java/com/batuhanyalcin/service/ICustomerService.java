package com.batuhanyalcin.service;

import com.batuhanyalcin.dto.DtoCustomer;
import com.batuhanyalcin.dto.DtoCustomerIU;

import java.security.PublicKey;
import java.util.List;

public interface ICustomerService {

    public DtoCustomer saveCustomer(DtoCustomerIU dtoCustomerIU);
    public List<DtoCustomer> getAllCustomer();
    public DtoCustomer customerById(Long Id);
    public String deleteCustomer(Long Id);
    public DtoCustomer updateCustomer(Long Id,DtoCustomerIU dtoCustomerIU);

}
