import { log } from "console";
import { throwDeprecation } from "process";


class DashboardPage {
    context;

    constructor(context) {
        this.context = context;
        this.page = null;
    }

    async initializePage() {
        if (!this.page || this.page.isClosed()) {
            this.page = await this.context.newPage();
        }
    }

    async openDashboard() {
        if (!this.page || this.page.isClosed()) {
            this.page = await this.context.newPage();
        }
        await this.page.goto('https://animated-gingersnap-8cf7f2.netlify.app');
    }

    async close() {
        await this.context?.close();
        await this.page?.close();
    }

    async openViewWithName(viewName) {
        const viewButton = await this.page.locator(`button:has(h2:has-text('${viewName}'))`);
        await viewButton.click();
    };

    async getColumnWithName(columnName) {
        return await this.page.locator(`div > h2:has-text('${columnName}') + div`);
    }

    async getAllTasksFromColumn(columnLocator) {
        return await columnLocator.locator('div:has(h3)')
    }

    async getTaskNamesFromTaskList(taskListLocator) {
        return await taskListLocator.locator('h3').allTextContents();
    }

    async getTaskFromTaskList(taskName, taskListLocator) {
        return await taskListLocator.locator(`h3:has-text('${taskName}')`).locator('..')

    }

    async getTaskName(taskLocator) {
        return await taskLocator.locator('h3').first().textContent();
    }

    async getTaskDescription(taskLocator) {
        return await taskLocator.locator('p').first().textContent();
    }

    async getTaskTags(taskLocator) {
        return await taskLocator.locator('div.flex.flex-wrap.gap-2.mb-3 > span').allTextContents();
    }

    async getTaskAssignee(taskLocator) {
        return await taskLocator.locator('div.flex.items-center.gap-1 > span').first().textContent();
    }

    async getCreationDate(taskLocator) {
        return await taskLocator.locator('div.flex.items-center.gap-1 > span').nth(1).textContent();
    }

    async getAllElementsFromColumn(columnName) {

        const columnLocator = await this.page.locator(`div > h2:has-text('${columnName}') + div`)

        try {
            return await columnLocator.locator('div:has(h3)')
        } catch (error) {
            console.log(`"An issue occurred while retrieving elements from the column: '${columnName}'"`, error.message)
        }
    }

    async getPage() {
        return this.page;
    }
}
export default DashboardPage;