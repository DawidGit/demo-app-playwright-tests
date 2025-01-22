import { test, expect, chromium } from '@playwright/test';
import DashboardPage from '../pages/dashboardPage'

let dashboardPage;

test.describe('Mobile Application View Tests', () => {

    let dashboardPage;

    test.beforeEach(async ({ browser }) => {
        const context = await browser.newContext({
            storageState: 'fixtures/auth-state.json',
        });
        dashboardPage = new DashboardPage(context);
        await dashboardPage.initializePage();
        await dashboardPage.openDashboard();
        await dashboardPage.openViewWithName("Mobile Application");
       
    });

    test.afterEach(async () => {
        await dashboardPage.close();
    });
    
    test('test case 4', async ({ }) => {

        const expectedTaskName = "Push notification system";
        const expectedTagName = "Feature";


        const column = await dashboardPage.getColumnWithName("To Do");
        const taskList = await dashboardPage.getAllTasksFromColumn(column);
        const task = await dashboardPage.getTaskFromTaskList(expectedTaskName, taskList);
        const taskName = await dashboardPage.getTaskName(task);
        const taskTags = await dashboardPage.getTaskTags(task);

        expect(taskName).toBe(expectedTaskName);
        expect(taskTags).toHaveLength(1);
        expect(taskTags[0]).toBe(expectedTagName);

    });

    test('test case 5', async ({ }) => {

        const expectedTaskName = "Offline mode";
        const expectedTagName1 = "Feature";
        const expectedTagName2 = "High Priority";

        const column = await dashboardPage.getColumnWithName("In Progress");
        const taskList = await dashboardPage.getAllTasksFromColumn(column);
        const task = await dashboardPage.getTaskFromTaskList(expectedTaskName, taskList);
        const taskName = await dashboardPage.getTaskName(task);
        const taskTags = await dashboardPage.getTaskTags(task);

        expect(taskName).toBe(expectedTaskName);
        expect(taskTags).toHaveLength(2);
        expect(taskTags[0]).toBe(expectedTagName1);
        expect(taskTags[1]).toBe(expectedTagName2);

    });

    test('test case 6', async ({ }) => {

        const expectedTaskName = "App icon design";
        const expectedTagName = "Design";

        const column = await dashboardPage.getColumnWithName("Done");
        const taskList = await dashboardPage.getAllTasksFromColumn(column);
        const task = await dashboardPage.getTaskFromTaskList(expectedTaskName, taskList);
        const taskName = await dashboardPage.getTaskName(task);
        const taskTags = await dashboardPage.getTaskTags(task);

        expect(taskName).toBe(expectedTaskName);
        expect(taskTags).toHaveLength(1);
        expect(taskTags[0]).toBe(expectedTagName);

    });

});