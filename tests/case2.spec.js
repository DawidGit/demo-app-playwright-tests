import { test, expect, chromium } from '@playwright/test';
import DashboardPage from '../pages/dashboardPage'
import AsanaFixtures from '../fixtures/asanaFixtures';

test('test case 2', async ({ browser }) => {

    const asanaFixtures = new AsanaFixtures();
    const dashboardPage = new DashboardPage(browser);
    const expectedTaskName = "Fix navigation bug";
    const expectedTagName = "Bug"

    await dashboardPage.openDashboard();
    await dashboardPage.openWebApplicationView();

    const columnToDo = await dashboardPage.getColumnWithName("To Do");
    const taskList = await dashboardPage.getAllTasksFromColumn(columnToDo);
    const task = await dashboardPage.getTaskFromTaskList(expectedTaskName,taskList);
    const taskTags = await dashboardPage.getTaskTags(task);

    expect(taskTags).toHaveLength(1);
    expect(taskTags[0]).toBe(expectedTagName);
    
});