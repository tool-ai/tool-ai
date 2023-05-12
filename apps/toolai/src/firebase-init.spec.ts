/** * @jest-environment node */
import './firebase-init';
import * as firestoreService from '@libs/firestore-service';
import { mockUser, User } from '@tool-ai/ui';

describe('Testing Firestore Functionality', () => {
  const testCollectionClients = 'testClients';
  it('should write a document to a collection in firestore', async () => {
    expect(
      await firestoreService.writeToDB(testCollectionClients, mockUser)
    ).toEqual(true);
    expect(
      await firestoreService.writeToDB(testCollectionClients, 'not an object')
    ).toEqual(false);
  });

  it('should read IDs from firestore', async () => {
    expect(
      (await firestoreService.getIDsFromDB(testCollectionClients)).length
    ).toBeGreaterThan(0);
    expect(
      (await firestoreService.getIDsFromDB('not-an-existing-collection')).length
    ).toEqual(0);
  });

  it('should read a whole collection from firestore', async () => {
    const collectionData: User[] = (await firestoreService.getAllFromDB(
      testCollectionClients
    )) as User[];
    expect(collectionData.length).toBeGreaterThan(0);
    expect(collectionData[0]).toEqual(mockUser);
  });

  it('should retrieve selected documents from a firestore collection', async () => {
    const collectionData: User[] = (await firestoreService.getSomeFromDB(
      testCollectionClients,
      'name',
      '==',
      mockUser.name
    )) as User[];
    expect(collectionData.length).toBeGreaterThan(0);
    expect(collectionData[0]).toEqual(mockUser);
  });

  it('should update a document in a collection in firestore', async () => {
    expect(
      await firestoreService.updateFirestoreDocument(
        testCollectionClients,
        mockUser.id,
        { email: 'jeffbezos@example.com' }
      )
    ).toEqual(true);

    expect(
      await firestoreService.updateFirestoreDocument(
        testCollectionClients,
        mockUser.id,
        'not an object'
      )
    ).toEqual(false);
  });

  it('should delete documents in a collection', async () => {
    expect(
      await firestoreService.deleteDocuments(
        testCollectionClients,
        'email',
        '==',
        'jeffbezos@example.com'
      )
    ).toEqual(true);
  });

  it('should delete a collection', async () => {
    await firestoreService.writeToDB(testCollectionClients, mockUser);
    expect(
      await firestoreService.deleteCollection(testCollectionClients)
    ).toEqual(true);
  });
});
