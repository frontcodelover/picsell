export interface DeleteCollectionProps {
  collectionId: string;
  collectionTitle: string;
  onDelete: (id: string) => void;
}

export interface EditCollectionProps {
  collectionId: string;
  collectionTitle: string;
  collectionDescription: string;
  onUpdate: (id: string, title: string, description: string) => void;
}
