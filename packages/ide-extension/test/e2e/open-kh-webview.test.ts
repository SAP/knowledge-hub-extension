import { test, expect } from '@playwright/test';

async function openKnowledgeHub(page) {
    await page.locator('.editor-group-container').click();
    await page.locator('.editor-group-container').press('Control+Shift+P');
    await page.getByPlaceholder('Type the name of a command to run.').fill('>SAP: Open Knowledge Hub');
    await page.getByPlaceholder('Type the name of a command to run.').press('Enter');
    await page.getByRole('tab', { name: 'Knowledge Hub extension by SAP' }).waitFor();
}

test('Opens knowledge hub editor from the command palette', async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/');

    // Open knowledge hub editor using the command palette
    await openKnowledgeHub(page);

    // Verify if the editor is open
    const knowledgeHubEditorTab = page.getByRole('tab', { name: 'Knowledge Hub extension by SAP' });
    expect(knowledgeHubEditorTab).toBeDefined();

    // Close the editor
    await page
        .getByRole('tab', { name: 'Knowledge Hub extension by SAP' })
        .getByRole('button', { name: 'Close (Ctrl+F4)' })
        .click();
});
