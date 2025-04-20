package com.batuhanyalcin.security_jwt_rolebased;

import com.batuhanyalcin.dto.DtoCustomer;
import com.batuhanyalcin.dto.DtoCustomerIU;
import com.batuhanyalcin.jwt.AuthRequest;
import com.batuhanyalcin.jwt.AuthResponse;
import com.batuhanyalcin.model.Role;
import com.batuhanyalcin.model.User;
import com.batuhanyalcin.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SecurityJwtRolebasedApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private ObjectMapper objectMapper;

	private String adminToken;
	private String userToken;

	@BeforeEach
	void setup() throws Exception {

		User adminUser = new User();
		adminUser.setUsername("admin");
		adminUser.setPassword(passwordEncoder.encode("admin123"));
		adminUser.setRole(Role.ADMIN);
		userRepository.save(adminUser);


		User normalUser = new User();
		normalUser.setUsername("user");
		normalUser.setPassword(passwordEncoder.encode("user123"));
		normalUser.setRole(Role.USER);
		userRepository.save(normalUser);


		AuthRequest adminAuth = new AuthRequest("admin", "admin123");
		MvcResult adminResult = mockMvc.perform(post("/authenticate")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(adminAuth)))
				.andReturn();
		AuthResponse adminResponse = objectMapper.readValue(
				adminResult.getResponse().getContentAsString(), AuthResponse.class);
		adminToken = adminResponse.getToken();


		AuthRequest userAuth = new AuthRequest("user", "user123");
		MvcResult userResult = mockMvc.perform(post("/authenticate")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(userAuth)))
				.andReturn();
		AuthResponse userResponse = objectMapper.readValue(
				userResult.getResponse().getContentAsString(), AuthResponse.class);
		userToken = userResponse.getToken();
	}

	@Test
	void adminCanAccessCustomerEndpoints() throws Exception {

		mockMvc.perform(get("/customer/list")
						.header("Authorization", "Bearer " + adminToken))
				.andExpect(status().isOk());

		// Admin yeni müşteri ekleyebilmeli
		DtoCustomerIU newCustomer = new DtoCustomerIU();
		newCustomer.setFirstName("Test");
		newCustomer.setLastName("Customer");
		newCustomer.setAge(30);
		newCustomer.setOrderName("Test Order");
		newCustomer.setProduct(new ArrayList<>());

		mockMvc.perform(post("/customer/save")
						.header("Authorization", "Bearer " + adminToken)
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(newCustomer)))
				.andExpect(status().isOk());
	}

	@Test
	void userCannotAccessCustomerEndpoints() throws Exception {
		// Normal kullanıcı müşteri listesine erişememeli
		mockMvc.perform(get("/customer/list")
						.header("Authorization", "Bearer " + userToken))
				.andExpect(status().isForbidden());


		DtoCustomerIU newCustomer = new DtoCustomerIU();
		newCustomer.setFirstName("Test");
		newCustomer.setLastName("Customer");
		newCustomer.setAge(30);
		newCustomer.setOrderName("Test Order");
		newCustomer.setProduct(new ArrayList<>());

		mockMvc.perform(post("/customer/save")
						.header("Authorization", "Bearer " + userToken)
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(newCustomer)))
				.andExpect(status().isForbidden());
	}

	@Test
	void unauthorizedUserCannotAccessCustomerEndpoints() throws Exception {

		mockMvc.perform(get("/customer/list"))
				.andExpect(status().isUnauthorized());


		DtoCustomerIU newCustomer = new DtoCustomerIU();
		newCustomer.setFirstName("Test");
		newCustomer.setLastName("Customer");
		newCustomer.setAge(30);
		newCustomer.setOrderName("Test Order");
		newCustomer.setProduct(new ArrayList<>());

		mockMvc.perform(post("/customer/save")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(newCustomer)))
				.andExpect(status().isUnauthorized());
	}
}