package com.batuhanyalcin.controller.impl;

import com.batuhanyalcin.controller.ICustomerController;
import com.batuhanyalcin.dto.DtoCustomer;
import com.batuhanyalcin.dto.DtoCustomerIU;
import com.batuhanyalcin.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/customer")
public class CustomerControllerİmpl implements ICustomerController {
    @Autowired
    private ICustomerService customerService;

    @PostMapping(path = "/save")
    public DtoCustomer saveCustomer(@RequestBody DtoCustomerIU dtoCustomerIU) {
        return customerService.saveCustomer(dtoCustomerIU);
    }

    @GetMapping(path = "/list")
    public List<DtoCustomer> getAllCustomer() {
        return customerService.getAllCustomer();
    }

    @GetMapping(path = "/id/{Id}")
    public DtoCustomer customerById(@PathVariable Long Id) {
        return customerService.customerById(Id);
    }

    @DeleteMapping(path = "/delete/{Id}")
    public String deleteCustomer(@PathVariable Long Id) {
        return customerService.deleteCustomer(Id);
    }

    @PutMapping(path = "/update/{Id}")
    public DtoCustomer updateCustomer(@PathVariable Long Id, @RequestBody DtoCustomerIU dtoCustomerIU) {
        return customerService.updateCustomer(Id,dtoCustomerIU);
    }
}
