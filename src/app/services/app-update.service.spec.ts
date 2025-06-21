import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AppUpdateService } from './app-update.service'
import { SwUpdate } from '@angular/service-worker'
import { of } from 'rxjs'
import { MATERIAL_ANIMATIONS } from '@angular/material/core'
import { HarnessLoader } from '@angular/cdk/testing'
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed'
import { MatSnackBarHarness } from "@angular/material/snack-bar/testing";
import { Component } from '@angular/core'

@Component({
  standalone: false,
})
class BlankPage { }

describe('AppUpdateService', () => {
  let fixture: ComponentFixture<BlankPage>
  let loader: HarnessLoader
  let service: AppUpdateService
  let swuMock: jasmine.SpyObj<SwUpdate>

  beforeEach(() => {
    swuMock = jasmine.createSpyObj<SwUpdate>("SwUpdate", {
      checkForUpdate: new Promise((resolve) => resolve(false)),
    }, {
      versionUpdates: of()
    })
    TestBed.configureTestingModule({
      declarations: [BlankPage],
      providers: [
        { provide: SwUpdate, useValue: swuMock },
        { provide: MATERIAL_ANIMATIONS, useValue: { animationsDisabled: true } }
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(BlankPage)
    fixture.detectChanges()
    service = TestBed.inject(AppUpdateService)
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should load harness for snackbar', async () => {
    service.promptUser()
    const snackBars = await loader.getAllHarnesses(MatSnackBarHarness);

    expect(snackBars.length).toBe(1)
  })

  it('should be able to get snackbar content', async () => {
    service.promptUser()
    const snackBar = await loader.getHarness(MatSnackBarHarness)
    expect(await snackBar.getMessage()).toBeDefined()
  })

  it('should be able to get snackbar action', async () => {
    service.promptUser()
    const snackBar = await loader.getHarness(MatSnackBarHarness)
    expect(await snackBar.getActionDescription()).toBeDefined()
  })

})
