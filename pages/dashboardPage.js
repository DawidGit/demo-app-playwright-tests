import { log } from "console";
import { throwDeprecation } from "process";


class DashboardPage {

    webApplicationButton;
    mobileApplicationButton;
    marketingCampainButton;
    toDoColumn;
    inProgressColumn;
    reviewColumn;
    doneColumn;
    context;

    constructor(browser) {
        this.browser = browser
        this.page = null;
    }

    async openDashboard() {
        this.context = await this.browser.newContext({
            storageState: 'fixtures/auth-state.json',
        });
        this.page = await this.context.newPage();
        await this.page.goto('https://animated-gingersnap-8cf7f2.netlify.app');

        this.webApplicationButton = this.page.locator('button:has(h2:has-text("Web Application"))');
        this.mobileApplicationButton = this.page.locator('button:has(h2:has-text("Mobile Application"))');
        this.marketingCampainButton = this.page.locator('button:has(h2:has-text("Marketing Campaign"))');
        this.toDoColumn = this.page.locator('div > h2:has-text("To Do") + div');
        this.inProgressColumn = this.page.locator('div:has(h2:has-text("In Progress"))');
        this.reviewColumn = this.page.locator('div:has(h2:has-text("Review"))');
        this.doneColumn = this.page.locator('div:has(h2:has-text("Done"))');
    }

    async closeDashboard() {
        await this.page.close();
        await this.context.close();
    }

    async getColumnWithName(columnName) {
        return this.page.locator(`div > h2:has-text('${columnName}') + div`);
    }

    async getAllTasksFromColumn(columnLocator) {
        return await columnLocator.locator('div:has(h3)')
    }

    async getTaskNamesFromTaskList(taskListLocator) {
        return await taskListLocator.locator('h3').allTextContents();
    }

    async getTaskFromTaskList(taskName, taskListLocator) {
        return await taskListLocator.locator(`h3:text('${taskName}')`).locator('..')

    }

    async getNameFromTask(taskLocator) {
      return await taskLocator.locator('h3').first().textContent();
    }

    async getTaskDescription(taskLocator) {
        return await taskLocator.locator('p').first().textContent();
    }

    async getTaskTags(taskLocator) {
        return await  taskLocator.locator('div.flex.flex-wrap.gap-2.mb-3 > span').allTextContents();
    }

    async getTaskAssignee(taskLocator) {
        return await taskLocator.locator('div.flex.items-center.gap-1 > span').first().textContent();
    }

    async getCreationDate(taskLocator) {
        return await taskLocator.locator('div.flex.items-center.gap-1 > span').nth(1).textContent();
    }
    

    async getTagsFromTask(taskLocator) {
        return taskLocator.locator()
    }


    async openWebApplicationView() {
        await this.webApplicationButton.click();
    };

    async openMobileApplicationView() {
        await this.mobileApplicationButton.click();
    };

    async openMarketingCampainView() {
        ; await this.marketingCampainButton.click();
    }

    async getAllElementsFromColumn(columnName) {
        switch (columnName) {
            case 'To Do':

                return this.toDoColumn.locator('div:has(h3)');
            case 'In Progress':
                return this.inProgressColumn.locator('div:has(h3)');
            case 'Review':
                return this.reviewColumn.locator('div:has(h3)');
            case 'Done':
                return this.doneColumn.locator('div:has(h3)');
            default:
                throw new Error(`Column name '${columnName}' doesn't exist.`);
        }
    }

    async getPage() {
        return this.page;
    }

    async returnParents(h3Elements) {
        let parents = [];
        const h3ElementsCount = await h3Elements.count()

        for (let i = 0; i < h3ElementsCount; i++) {
            parents.push(await h3Elements.nth(i).locator('..'));
        }

        return parents;

    }
}
export default DashboardPage;