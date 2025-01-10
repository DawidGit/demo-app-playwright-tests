import { test, expect, chromium } from '@playwright/test';
import DashboardPage from '../pages/dashboardPage'
import AsanaFixtures from '../fixtures/asanaFixtures';

test('test case 1', async ({ browser }) => {

    const asanaFixtures = new AsanaFixtures();
    const dashboardPage = new DashboardPage(browser);
    const expectedTaskName = "Implement user authentication";
    
    await dashboardPage.openDashboard();
    await dashboardPage.openWebApplicationView();
    
    const columnToDo = await dashboardPage.getColumnWithName('To Do')
    const taskListFromCoumntToDo = await dashboardPage.getAllTasksFromColumn(columnToDo);
    const fetchedTask = await dashboardPage.getTaskFromTaskList(expectedTaskName, taskListFromCoumntToDo);
    const fetchedTaskName = await dashboardPage.getNameFromTask(fetchedTask);

    expect(fetchedTaskName).toBe(expectedTaskName);


});
