describe('Home screen', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show todo text on the home screen', async () => {
    await expect(element(by.id('todo-title'))).toBeVisible();
  });

  it('should show the available todos tap', async () => {
    await expect(element(by.id('todo-list')).atIndex(1)).toBeVisible();
  });

  it('should tap the trash icon', async () => {
    await element(by.id('trash-icon')).atIndex(1).tap();
  });

  it('should tap the New Todo button', async () => {
    await element(by.id('todo-button')).tap();
    await expect(element(by.id('input-category'))).toBeVisible();
  });

  it('should show modal when form is submitted with missing results', async () => {
    await element(by.text('New Todo')).tap();
    await expect(element(by.id('input-category'))).toBeVisible();
    await element(by.id('input-category')).typeText('sports');
    await element(by.id('todo-button')).tap()
    await expect(by.text('Please add todo details')).toBeVisible();
  });

  it('should enter form information and submit input form', async () => {
    await element(by.id('New Todo')).tap();
    await expect(element(by.id('input-category'))).toBeVisible();
    await element(by.id('input-category')).typeText('sports');
    await element(by.id('input-description')).typeText('Example Description');
    await element(by.id('input-duedate')).replaceText('2021-03-23');
    await element(by.id('todo-button')).tap();
  });
});
