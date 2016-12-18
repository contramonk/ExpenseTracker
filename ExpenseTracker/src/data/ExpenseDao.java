package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import entities.Expense;

@Repository
@Transactional
public class ExpenseDao {
	@PersistenceContext
	private EntityManager em;

	public List<Expense> index() {
		String query = "Select e from Expense e";
		return em.createQuery(query, Expense.class).getResultList();
	}

	public Expense show(int id) {
		return em.find(Expense.class, id);
	}

	public Expense create(Expense expense) {
		em.persist(expense);
		em.flush();

		return expense;
	}

	public Expense update(int id, Expense exp) {
		Expense expense = em.find(Expense.class, id);
		expense.setTitle(exp.getTitle());
		expense.setDescription(exp.getDescription());
		expense.setAmount(exp.getAmount());
		expense.setCategory(exp.getCategory());

		em.persist(expense);
		em.flush();

		return expense;
	}

	public Expense destroy(int id) {
		Expense expense = em.find(Expense.class, id);
		em.remove(expense);
		return expense;
	}
}
