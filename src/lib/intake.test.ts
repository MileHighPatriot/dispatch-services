import { describe, expect, it } from 'vitest'
import { emptyAccountRequest, emptyServeRequest, validateAccountRequest, validateServeRequest } from './intake'

describe('validateServeRequest', () => {
  it('asks for the contact, email, subject and address', () => {
    expect(Object.keys(validateServeRequest(emptyServeRequest)).sort()).toEqual(
      ['email', 'requester_name', 'subject_address', 'subject_name'].sort(),
    )
  })

  it('passes a complete request', () => {
    const r = {
      ...emptyServeRequest,
      requester_name: 'Pat Lee',
      email: 'pat@firm.com',
      subject_name: 'John Doe',
      subject_address: '123 Main St, Denver',
    }
    expect(validateServeRequest(r)).toEqual({})
  })

  it('rejects files over the limit', () => {
    const big = { name: 'huge.pdf', size: 21 * 1024 * 1024 } as File
    expect(validateServeRequest(emptyServeRequest, [big]).files).toMatch(/huge\.pdf/)
  })
})

describe('validateAccountRequest', () => {
  it('only checks the billing email when one is given', () => {
    const r = { ...emptyAccountRequest, firm: 'Lee Law', contact_name: 'Pat', email: 'pat@lee.law' }
    expect(validateAccountRequest(r)).toEqual({})
    expect(validateAccountRequest({ ...r, billing_email: 'nope' }).billing_email).toBeDefined()
  })
})
