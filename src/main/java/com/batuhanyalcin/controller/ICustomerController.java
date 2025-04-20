package com.batuhanyalcin.controller;

import com.batuhanyalcin.dto.DtoCustomer;
import com.batuhanyalcin.dto.DtoCustomerIU;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ICustomerController {
    public ResponseEntity<DtoCustomer> saveCustomer(DtoCustomerIU dtoCustomerIU);
    public ResponseEntity<List<DtoCustomer>> getAllCustomer();
    public ResponseEntity<DtoCustomer> customerById(Long Id);
    public ResponseEntity<String> deleteCustomer(Long Id);
    public ResponseEntity<DtoCustomer> updateCustomer(Long Id, DtoCustomerIU dtoCustomerIU);
}
