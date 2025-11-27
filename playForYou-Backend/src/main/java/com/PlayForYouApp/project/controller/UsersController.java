package com.PlayForYouApp.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.PlayForYouApp.project.entities.LoginRequest;
import com.PlayForYouApp.project.entities.Users;
import com.PlayForYouApp.project.services.UsersService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class UsersController 
{
	
	@Autowired
	UsersService userv;

	@PostMapping("/register")
	public ResponseEntity<String> addUser(@RequestBody Users user) {
		boolean userStatus = userv.emailExists(user.getEmail());
		if (!userStatus) {
			userv.addUser(user);
			return ResponseEntity.ok("User registered successfully.");
		} else {
			return ResponseEntity.badRequest().body("Email already exists.");
		}
	}

	@PostMapping("/login")
	public ResponseEntity<String> validateUser(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
		String email = loginRequest.getEmail();
		String password = loginRequest.getPassword();

		// Call your service method to validate the user
		boolean loginStatus = userv.validateUser(email, password);

		if (loginStatus) {
			//creating session
			HttpSession session = request.getSession();
			//System.out.println("session created "+session.getId());
			session.setAttribute("email", email);

			//System.out.println(session.getAttribute("email"));
	
			
			//checking the role of user
			String role = userv.checkRole(email);
			System.out.println(role);

			String homePage = null;
			if ("admin".equals(role)) {
				homePage = "adminHome";
			} else if("customer".equals(role)){
				homePage = "customerHome";
			}

			return ResponseEntity.ok(homePage);
		} else {
			return ResponseEntity.badRequest().body("loginFail");

		}
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate(); // Invalidate the session
		}
		System.out.println("Session cleared");
		return ResponseEntity.ok("Logged out successfully"); // Return a success message
	}
		
	@GetMapping("/customers")
	public List<Users> getCustomers()
	{
		//returns the list of all customers
		return userv.getAllCustomers("customer");
	}
	
	
	@GetMapping("/premiumStatus")
	public Boolean premiumStatus(@RequestParam String email)
	{
		Users user = userv.getUser(email);
		boolean flag = user.isPremium();
		return flag; // true if premium else false
	}
	
	@GetMapping("/user")
	public Users getUserByEmail(@RequestParam String email)
	{
		//returns User details with provided email
		return userv.getUser(email);
	}
	
	@PostMapping("/updatePassword")
	 public String updatePass(@RequestBody LoginRequest req) {
	        String email = req.getEmail();
	        String password = req.getPassword();

	        Users user = userv.getUser(email);
	        if (user == null) {
	            return "User not found";
	        }

	        user.setPassword(password);
	        userv.updateUser(user);
	        
	        System.out.println(user.getPassword());

	        return "Password Updated Successfully";
	    }
}
