package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.ExpenseDao;
import entities.Expense;

@RestController
@RequestMapping("expense")
public class ExpenseController {
	@Autowired
	private ExpenseDao expenseDao;
	
	@RequestMapping(value = "ping", method = RequestMethod.GET)
	public String ping() {
		return "pong";
	}
	
	@RequestMapping(path = "", method = RequestMethod.GET)
	public List<Expense> index() {
		return expenseDao.index();
	}
	
	@RequestMapping(path = "{id}", method = RequestMethod.GET)
	public Expense show(@PathVariable int id) {
		return expenseDao.show(id);
	}
	
	@RequestMapping(path = "", method = RequestMethod.POST)
	public Expense create(@RequestBody String expenseJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Expense exp = null;
		
		try {
			exp = mapper.readValue(expenseJSON,  Expense.class);
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return expenseDao.create(exp);
	}
	
	@RequestMapping(path = "{id}", method = RequestMethod.PUT)
	public Expense update(@PathVariable int id, @RequestBody String expenseJSON) {
		ObjectMapper mapper = new ObjectMapper();
		Expense expense = null;
		
		try {
			expense = mapper.readValue(expenseJSON,  Expense.class);
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return expenseDao.update(id, expense);
	}
	
	
	
	@RequestMapping(path = "{id}", method = RequestMethod.DELETE)
	public Expense destroy(@PathVariable int id) {
		return expenseDao.destroy(id);
	}
}
