package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Expense;

public class ExpenseTest {
	EntityManager em;
	
	@Before
	public void setUp() throws Exception {
		em = Persistence
				.createEntityManagerFactory("ExpenseDb")
				.createEntityManager();
	}

	@Test
	public void test() {
		Expense expense = em.find(Expense.class, 1);
		System.out.println(expense);
		assertEquals("Cigarrettes", expense.getTitle());
	
	}

	@After
	public void tearDown() throws Exception {
		em.close();
	}

}
