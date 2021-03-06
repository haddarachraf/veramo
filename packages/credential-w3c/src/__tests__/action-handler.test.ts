import {
  W3CCredential,
  VerifiableCredential,
  IIdentifier,
  W3CPresentation,
  VerifiablePresentation,
} from '@veramo/core'

const mockDidJwtVc = {
  createVerifiableCredentialJwt: jest.fn().mockReturnValue('mockVcJwt'),
  createVerifiablePresentationJwt: jest.fn().mockReturnValue('mockVcJwt'),
  verifyCredential: jest.fn().mockReturnValue({ payload: {} }),
  normalizeCredential: jest.fn().mockReturnValue('mockCredential'),
  normalizePresentation: jest.fn().mockReturnValue('mockPresentation'),
}

jest.mock('did-jwt-vc', () => mockDidJwtVc)

import { CredentialIssuer, IContext } from '../action-handler'

const mockIdentifier1: IIdentifier = {
  did: 'did:example:111',
  provider: 'mock',
  controllerKeyId: 'kid1',
  keys: [
    {
      kid: 'kid1',
      publicKeyHex: 'pub',
      type: 'Secp256k1',
      kms: 'mock',
    },
  ],
  services: [],
}

const mockIdentifier2: IIdentifier = {
  did: 'did:example:222',
  provider: 'mock',
  controllerKeyId: 'kid2',
  keys: [
    {
      kid: 'kid2',
      publicKeyHex: 'pub',
      type: 'Secp256k1',
      kms: 'mock',
    },
  ],
  services: [],
}

const context: IContext = {
  agent: {
    execute: jest.fn(),
    availableMethods: jest.fn(),
    resolveDid: jest.fn(),
    emit: jest.fn(),
    didManagerGet: jest.fn().mockImplementation(async (args): Promise<IIdentifier> => mockIdentifier1),
    keyManagerSignJWT: jest.fn().mockImplementation(async (args): Promise<string> => 'mockJWT'),
    dataStoreSaveVerifiableCredential: jest.fn().mockImplementation(async (args): Promise<boolean> => true),
    dataStoreSaveVerifiablePresentation: jest.fn().mockImplementation(async (args): Promise<boolean> => true),
    getSchema: jest.fn(),
  },
}

const w3c = new CredentialIssuer()

describe('@veramo/credential-w3c', () => {
  it('handles createVerifiableCredential', async () => {
    const credential: W3CCredential = {
      '@context': ['https://www.w3.org/2018/credentials/v1', 'https://www.w3.org/2020/demo/4342323'],
      type: ['VerifiableCredential', 'PublicProfile'],
      issuer: { id: mockIdentifier1.did },
      issuanceDate: new Date().toISOString(),
      id: 'vc1',
      credentialSubject: {
        id: mockIdentifier2.did,
        name: 'Alice',
        profilePicture: 'https://example.com/a.png',
        address: {
          street: 'Some str.',
          house: 1,
        },
      },
    }

    const vc = await w3c.createVerifiableCredential(
      {
        credential,
        save: true,
        proofFormat: 'jwt',
      },
      context,
    )
    // TODO Update these after refactoring did-jwt-vc
    expect(context.agent.didManagerGet).toBeCalledWith({ did: mockIdentifier1.did })
    expect(context.agent.dataStoreSaveVerifiableCredential).toBeCalledWith({
      verifiableCredential: 'mockCredential',
    })
    expect(vc).toEqual('mockCredential')
  })

  it('handles createVerifiablePresentation', async () => {
    const credential: VerifiableCredential = {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', 'PublicProfile'],
      issuer: { id: mockIdentifier1.did },
      issuanceDate: new Date().toISOString(),
      id: 'vc1',
      credentialSubject: {
        id: mockIdentifier2.did,
        name: 'Alice',
        profilePicture: 'https://example.com/a.png',
        address: {
          street: 'Some str.',
          house: 1,
        },
      },
      proof: {
        jwt: 'mockJWT',
      },
    }

    const presentation: W3CPresentation = {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      holder: mockIdentifier1.did,
      verifier: [mockIdentifier2.did],
      issuanceDate: new Date().toISOString(),
      verifiableCredential: [credential],
    }

    const vp = await w3c.createVerifiablePresentation(
      {
        presentation,
        save: true,
        proofFormat: 'jwt',
      },
      context,
    )

    expect(context.agent.didManagerGet).toBeCalledWith({ did: mockIdentifier1.did })
    expect(context.agent.dataStoreSaveVerifiablePresentation).toBeCalledWith({
      verifiablePresentation: 'mockPresentation',
    })
    expect(vp).toEqual('mockPresentation')
  })
})
