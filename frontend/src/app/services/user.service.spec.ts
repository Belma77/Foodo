import { TestBed } from '@angular/core/testing';
import { User } from '../models/user.model';
import { CoreRequestService } from './core-request.service';

import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let coreRequestService: CoreRequestService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UserService);
        coreRequestService = TestBed.inject(CoreRequestService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
