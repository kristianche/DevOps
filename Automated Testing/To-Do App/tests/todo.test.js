// verify if a user can add a task

const { test, expect} = require('@playwright/test');

test('user can add a task', async ({ page }) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task');
})

//Verify if a user can delete a task

test('user can delete a task', async ({ page }) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    await page.click(' .task .delete-task');

    const tasks = await page.$$eval('.task', tasks => tasks.map(task => task.textContent));
    expect(tasks).not.toContain('Test Task');
});

//Verify if a user can mark a task as complete

test('user can mark a task as complete', async ({ page }) => {
    await page.goto('http://localhost:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    await page.click('.task .task-complete');
    const completedTask = await page.$('.task.completed');
    expect(completedTask).not.toBeNull();
})

//Verify if a user can filter

test('user can filter tasks', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    await page.click('.task .task-complete');

    await page.selectOption('#filter', 'Completed');
    const incompleteTask = await page.$('.task:not(.completed)');
    expect(incompleteTask).toBeNull();
})