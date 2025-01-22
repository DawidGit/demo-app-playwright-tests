import { test, expect, chromium } from '@playwright/test';
import DashboardPage from '../pages/dashboardPage'

let dashboardPage;

test.describe('Web Application View Tests', () => {


    let dashboardPage;

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext({
            storageState: 'fixtures/auth-state.json',
        });
        dashboardPage = new DashboardPage(context);
        await dashboardPage.initializePage();
        await dashboardPage.openDashboard();
        await dashboardPage.openViewWithName("Web Application");
    });

    test.afterEach(async () => {
        await dashboardPage.close();
    });


    test('test case 1', async ({ }) => {

        const expectedTaskName = "Implement user authentication";
        const expectedTaskTag1 = "Feature";
        const expectedTaskTag2 = "High Priority";

        const column = await dashboardPage.getColumnWithName('To Do')
        const taskList = await dashboardPage.getAllTasksFromColumn(column);
        const task = await dashboardPage.getTaskFromTaskList(expectedTaskName, taskList);
        const taskName = await dashboardPage.getTaskName(task);
        const taskTags = await dashboardPage.getTaskTags(task);

        expect(taskName).toBe(expectedTaskName);
        expect(taskTags).toHaveLength(2)
        expect(taskTags[0]).toBe(expectedTaskTag1);
        expect(taskTags[1]).toBe(expectedTaskTag2);
    });

    test('test case 2', async ({ }) => {

        const expectedTaskName = "Fix navigation bug";
        const expectedTagName = "Bug"

        const column = await dashboardPage.getColumnWithName("To Do");
        const taskList = await dashboardPage.getAllTasksFromColumn(column);
        const task = await dashboardPage.getTaskFromTaskList(expectedTaskName, taskList);
        const taskName = await dashboardPage.getTaskName(task);
        const taskTags = await dashboardPage.getTaskTags(task);

        expect(taskName).toBe(expectedTaskName);
        expect(taskTags).toHaveLength(1);
        expect(taskTags[0]).toBe(expectedTagName);

    });

    test('test case 3', async ({ }) => {

        const expectedTaskName = "Design system updates";
        const expectedTagName = "Design";

        const column = await dashboardPage.getColumnWithName("In Progress");
        const taskList = await dashboardPage.getAllTasksFromColumn(column);
        const task = await dashboardPage.getTaskFromTaskList(expectedTaskName, taskList);
        const taskName = await dashboardPage.getTaskName(task);
        const taskTags = await dashboardPage.getTaskTags(task);

        expect(taskName).toBe(expectedTaskName);
        expect(taskTags).toHaveLength(1);
        expect(taskTags[0]).toBe(expectedTagName);

    });



});


