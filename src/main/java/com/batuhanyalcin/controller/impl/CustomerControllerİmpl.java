package com.batuhanyalcin.controller.impl;

import com.batuhanyalcin.controller.ICustomerController;
import com.batuhanyalcin.dto.DtoCustomer;
import com.batuhanyalcin.dto.DtoCustomerIU;
import com.batuhanyalcin.service.ICustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/customer")
public class CustomerControllerİmpl implements ICustomerController {
    @Autowired
    private ICustomerService customerService;

    @PostMapping("/save")
    public ResponseEntity<DtoCustomer> saveCustomer(@Valid @RequestBody DtoCustomerIU dtoCustomerIU) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(customerService.saveCustomer(dtoCustomerIU));
    }

    @GetMapping("/list")
    public ResponseEntity<List<DtoCustomer>> getAllCustomer() {
        return ResponseEntity.ok(customerService.getAllCustomer());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<DtoCustomer> customerById(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.customerById(id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.deleteCustomer(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DtoCustomer> updateCustomer(
            @PathVariable Long id,
            @Valid @RequestBody DtoCustomerIU dtoCustomerIU) {
        return ResponseEntity.ok(customerService.updateCustomer(id, dtoCustomerIU));
    }
}
