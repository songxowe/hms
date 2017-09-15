package com.hms.controller;

import com.hms.pojo.Expense;
import com.hms.service.ExpenseService;
import net.sf.json.JSON;
import net.sf.json.JSONSerializer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/*
*  消费表  控制器
*
 */
import javax.annotation.Resource;
import java.util.List;

@Controller
public class ExpenseController {
    @Resource(name = "expenseService")
    private ExpenseService expenseService;

    @RequestMapping(value = "expenseController_find",produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String expenseController_find(@RequestParam(required = false,value = "expenseName") String expenseName) {
        System.out.println();

        List<Expense> list = expenseService.find(expenseName);
        for (Expense e : expenseService.find(expenseName)) {
            System.out.println(e.getExpenseId() + " " + e.getExpenseName() + " " + e.getExpenseType()
                    + " " + e.getExpenseStatus() + " " + e.getExpenseUnit() + " " + e.getExpensePrice());
        }
        JSON json = JSONSerializer.toJSON(list);
        System.out.println("json.toString()..." + json.toString());
        return json.toString();
    }
     @RequestMapping("expense_findById")
     public String expense_findById(@RequestParam(value = "expenseId",required = false) Integer expenseId,ModelMap modelmap){

         if (expenseId!=null){
             System.out.println("111");
             Expense expense= expenseService.findById(expenseId);
             modelmap.put("expense",expense);
         }
         return "Expenseedit";
    }

    @RequestMapping(value = "expenseController_save",produces = "text/html;charset=UTF-8")
    public @ResponseBody String expenseController_save(Expense expense){
         int count = 0;
         if (expense != null && expense.getExpenseId()!=null){
             count += expenseService.modify(expense);
         }else {
             count += expenseService.add(expense);
         }
         return String.valueOf(count);

    }
}
