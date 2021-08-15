import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoComponent } from '../pages/views/produto/produto.component';

describe('ProdutoComponent', () => {
  let component: ProdutoComponent;
  let fixture: ComponentFixture<ProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});