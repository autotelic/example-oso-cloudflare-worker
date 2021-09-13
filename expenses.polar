user_in_role(user: User, "accountant") if
    user.title = "Accountant";

allow(user: User, "view", _expense: Expense) if
    user_in_role(user, "accountant");
