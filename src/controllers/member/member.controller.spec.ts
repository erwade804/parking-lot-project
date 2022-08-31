import { Test } from '@nestjs/testing';
import { AppModule } from '../../app.module';

describe('MemberController', () => {
  // let appController: AppController;

  beforeEach(async () => {
    await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
