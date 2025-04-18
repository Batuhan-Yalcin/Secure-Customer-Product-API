package com.batuhanyalcin.service.impl;

import com.batuhanyalcin.dto.DtoCustomer;
import com.batuhanyalcin.dto.DtoCustomerIU;
import com.batuhanyalcin.dto.DtoProduct;
import com.batuhanyalcin.model.Customer;
import com.batuhanyalcin.model.Product;
import com.batuhanyalcin.repository.CustomerRepository;
import com.batuhanyalcin.service.ICustomerService;
import com.fasterxml.jackson.core.PrettyPrinter;
import com.fasterxml.jackson.databind.util.BeanUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceİmpl implements ICustomerService {
    @Autowired
    private CustomerRepository customerRepository;


    public DtoCustomer saveCustomer(DtoCustomerIU dtoCustomerIU) {
        DtoCustomer dto = new DtoCustomer();

        Customer customer = new Customer();
        BeanUtils.copyProperties(dtoCustomerIU,customer);

        List<Product> productList = new ArrayList<>();
        List<DtoProduct> dtoProductList = new ArrayList<>();

        if (dtoCustomerIU.getProduct() != null && !dtoCustomerIU.getProduct().isEmpty()) {
            for (DtoProduct dtoProduct : dtoCustomerIU.getProduct()) {
                Product product = new Product();
                BeanUtils.copyProperties(dtoProduct, product);
                productList.add(product);
            }
           customer.setProduct(productList);
          Customer dbCustomer = customerRepository.save(customer);

          if(dbCustomer.getProduct() != null){
              for(Product products : dbCustomer.getProduct()){
                  DtoProduct dtoProduct = new DtoProduct();
                  BeanUtils.copyProperties(products,dtoProduct);
                  dtoProductList.add(dtoProduct);
              }
          }
          BeanUtils.copyProperties(dbCustomer,dto);
          dto.setProduct(dtoProductList);
          return  dto;
        }
        return null;
    }

    public List<DtoCustomer> getAllCustomer() {
        List<DtoCustomer> dtoCustomerList = new ArrayList<>();
        List<Customer> customerList = customerRepository.findAll();
        for(Customer customer : customerList){
            DtoCustomer dto = new DtoCustomer();
            BeanUtils.copyProperties(customer,dto);
            List<DtoProduct> dtoProductList = new ArrayList<>();
            for (Product product : customer.getProduct()){
                DtoProduct dtoProduct = new DtoProduct();
                BeanUtils.copyProperties(product,dtoProduct);
                dtoProductList.add(dtoProduct);
            }
            dto.setProduct(dtoProductList);
            dtoCustomerList.add(dto);
        }
        return  dtoCustomerList;
    }

    @Override
    public DtoCustomer customerById(Long id) {
        DtoCustomer dto = new DtoCustomer();
        Optional<Customer> optional = customerRepository.findById(id);
        if(optional.isEmpty()){
            throw new RuntimeException("Bu İd ye sahip bir kullanıcı bulunamadı!");
        }
        Customer dbCustomer = optional.get();
        List<Product> productList = dbCustomer.getProduct();
        BeanUtils.copyProperties(dbCustomer,dto);

        dto.setProduct(new ArrayList<>());

        if(productList != null && !productList.isEmpty()){
            for(Product product : productList){
                DtoProduct dtoProduct = new DtoProduct();
                BeanUtils.copyProperties(product,dtoProduct);
                dto.getProduct().add(dtoProduct);
            }
        }

        return dto;
    }

    @Override
    public String deleteCustomer(Long id) {
        Optional<Customer> optional=customerRepository.findById(id);
        if (optional.isEmpty()){
          return "\n {" +
                  "\n Error Code : 101" +
                  "\n Error Message : Bu Id'ye Sahip Birisi olmadığından Silme işlemi Başarısız olmuştur!" +
                  "\n Error Owner : Batuhan Yalçın" +
                  "\n }";

        }
        Customer deleteCustomer=optional.get();
        customerRepository.delete(deleteCustomer);
        return "Başarıyla Silinmiştir..";
    }

    @Override
    public DtoCustomer updateCustomer(Long Id, DtoCustomerIU dtoCustomerIU) {
        DtoCustomer dto = new DtoCustomer();
        Optional<Customer> optional = customerRepository.findById(Id);

        if(optional.isEmpty()){
            throw new RuntimeException("Bu Id'ye Sahip Birisi Olmadığından Güncelleme İşlemi Başarısız Olmuştur!");
        }

        Customer dbCustomer = optional.get();
        BeanUtils.copyProperties(dtoCustomerIU,dbCustomer);

        if(dtoCustomerIU.getProduct() != null){
            List<Product> productList = new ArrayList<>();
            for(DtoProduct dtoProduct : dtoCustomerIU.getProduct()){
                Product product = new Product();
                BeanUtils.copyProperties(dtoProduct,product);
                productList.add(product);
            }
            dbCustomer.setProduct(productList);
        }
        Customer updateCustomer = customerRepository.save(dbCustomer);
        BeanUtils.copyProperties(updateCustomer,dto);

        List<DtoProduct> dtoProductList = new ArrayList<>();
        for(Product products : updateCustomer.getProduct()){
            DtoProduct dtoProducts = new DtoProduct();
            BeanUtils.copyProperties(products,dtoProducts);
            dtoProductList.add(dtoProducts);
        }
        dto.setProduct(dtoProductList);
        return dto;
    }
}
