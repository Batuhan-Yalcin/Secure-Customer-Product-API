package com.batuhanyalcin.service.impl;

import com.batuhanyalcin.dto.DtoCustomer;
import com.batuhanyalcin.dto.DtoCustomerIU;
import com.batuhanyalcin.dto.DtoProduct;
import com.batuhanyalcin.exception.BadRequestException;
import com.batuhanyalcin.exception.ResourceNotFoundException;
import com.batuhanyalcin.model.Customer;
import com.batuhanyalcin.model.Product;
import com.batuhanyalcin.repository.CustomerRepository;
import com.batuhanyalcin.service.ICustomerService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceİmpl implements ICustomerService {
    @Autowired
    private CustomerRepository customerRepository;


    @Override
    public DtoCustomer saveCustomer(DtoCustomerIU dtoCustomerIU) {
        if (dtoCustomerIU == null) {
            throw new BadRequestException("Müşteri bilgileri boş olamaz");
        }

        Customer customer = new Customer();
        BeanUtils.copyProperties(dtoCustomerIU, customer);

        List<Product> productList = new ArrayList<>();
        List<DtoProduct> dtoProductList = new ArrayList<>();

        if (dtoCustomerIU.getProduct() == null || dtoCustomerIU.getProduct().isEmpty()) {
            throw new BadRequestException("Ürün listesi boş olamaz");
        }

        for (DtoProduct dtoProduct : dtoCustomerIU.getProduct()) {
            Product product = new Product();
            BeanUtils.copyProperties(dtoProduct, product);
            productList.add(product);
        }

        customer.setProduct(productList);
        Customer dbCustomer = customerRepository.save(customer);

        DtoCustomer dto = new DtoCustomer();
        if (dbCustomer.getProduct() != null) {
            for (Product products : dbCustomer.getProduct()) {
                DtoProduct dtoProduct = new DtoProduct();
                BeanUtils.copyProperties(products, dtoProduct);
                dtoProductList.add(dtoProduct);
            }
        }

        BeanUtils.copyProperties(dbCustomer, dto);
        dto.setProduct(dtoProductList);
        return dto;
    }


    @Override
    public List<DtoCustomer> getAllCustomer() {
        List<Customer> customerList = customerRepository.findAll();
        if (customerList.isEmpty()) {
            throw new ResourceNotFoundException("Kayıtlı müşteri bulunamadı");
        }

        List<DtoCustomer> dtoCustomerList = new ArrayList<>();
        for (Customer customer : customerList) {
            DtoCustomer dto = new DtoCustomer();
            BeanUtils.copyProperties(customer, dto);
            List<DtoProduct> dtoProductList = new ArrayList<>();
            for (Product product : customer.getProduct()) {
                DtoProduct dtoProduct = new DtoProduct();
                BeanUtils.copyProperties(product, dtoProduct);
                dtoProductList.add(dtoProduct);
            }
            dto.setProduct(dtoProductList);
            dtoCustomerList.add(dto);
        }
        return dtoCustomerList;
    }

    @Override
    public DtoCustomer customerById(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Müşteri bulunamadı: " + id));

        DtoCustomer dto = new DtoCustomer();
        BeanUtils.copyProperties(customer, dto);

        List<DtoProduct> dtoProducts = new ArrayList<>();
        if (customer.getProduct() != null) {
            for (Product product : customer.getProduct()) {
                DtoProduct dtoProduct = new DtoProduct();
                BeanUtils.copyProperties(product, dtoProduct);
                dtoProducts.add(dtoProduct);
            }
        }
        dto.setProduct(dtoProducts);
        return dto;
    }

    @Override
    public String deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Silinecek müşteri bulunamadı: " + id));

        try {
            customerRepository.delete(customer);
            return "Müşteri başarıyla silindi";
        } catch (Exception e) {
            throw new BadRequestException("Müşteri silinirken bir hata oluştu");
        }
    }

    @Override
    public DtoCustomer updateCustomer(Long id, DtoCustomerIU dtoCustomerIU) {
        if (dtoCustomerIU == null) {
            throw new BadRequestException("Güncellenecek müşteri bilgileri boş olamaz");
        }

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Güncellenecek müşteri bulunamadı: " + id));

        BeanUtils.copyProperties(dtoCustomerIU, customer);

        if (dtoCustomerIU.getProduct() != null) {
            List<Product> productList = new ArrayList<>();
            for (DtoProduct dtoProduct : dtoCustomerIU.getProduct()) {
                Product product = new Product();
                BeanUtils.copyProperties(dtoProduct, product);
                productList.add(product);
            }
            customer.setProduct(productList);
        }

        Customer updatedCustomer = customerRepository.save(customer);
        DtoCustomer dto = new DtoCustomer();
        BeanUtils.copyProperties(updatedCustomer, dto);

        List<DtoProduct> dtoProducts = new ArrayList<>();
        for (Product product : updatedCustomer.getProduct()) {
            DtoProduct dtoProduct = new DtoProduct();
            BeanUtils.copyProperties(product, dtoProduct);
            dtoProducts.add(dtoProduct);
        }
        dto.setProduct(dtoProducts);
        return dto;
    }
}
