package com.openclassrooms.starterjwt.security.jwt;

import com.openclassrooms.starterjwt.SpringBootSecurityJwtApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SpringBootSecurityJwtApplication.class)
@TestPropertySource(locations = "classpath:application.properties")
@AutoConfigureMockMvc
public class DbLoginResgisterTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void register() throws Exception {

        String payload = "{ 'email': 'fodil@bg.fr', 'password': '123456', 'firstName': 'fodil', 'lastName': 'bouamama' }";
        mockMvc.perform(post("/api/auth/register")
                        .contentType("application/json")
                        .content(payload.replace("'", "\"")))
                .andExpect(status().isOk());

    }

    @Test
    void login() throws Exception {

        String payload = "{ 'email': 'fodil@bg.fr' , 'password': '123456' }";
        mockMvc.perform(post("/api/auth/login")
                        .contentType("application/json")
                        .content(payload.replace("'", "\"")))
                .andExpect(status().isOk());

    }}