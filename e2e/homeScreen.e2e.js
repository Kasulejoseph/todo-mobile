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
    await expect(element(by.id('todo-list')).atIndex(0)).toBeVisible();
  });

  // it('should tap the trash icon', async () => {
  //   await element(by.id('trash-icon')).atIndex(0).tap();
  // });

  it('should tap the New Todo button', async () => {
    await element(by.id('todo-button')).tap();
    await expect(element(by.id('input-category'))).toBeVisible();
  });

  it('should show modal when form is submitted with missing results', async () => {
    await element(by.text('New Todo')).tap();
    await expect(element(by.id('input-category'))).toBeVisible();
    await element(by.id('input-category')).typeText('sports');
    await element(by.text('Add Todo')).tap();
    await element(by.text('OK')).tap();
  });

  it('should enter form information and submit input form', async () => {
    await element(by.text('New Todo')).tap();
    await expect(element(by.id('input-category'))).toBeVisible();
    await element(by.id('input-category')).typeText('sports');
    await element(by.id('input-description')).typeText('Example Description');
    await element(by.id('input-duedate')).tap();
    await element(by.text('OK')).tap();
    await element(by.text('Add Todo')).tap();
  });
});
