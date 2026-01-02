
import { Product } from '@/types';
import * as Clipboard from 'expo-clipboard';
import { Platform, Share } from 'react-native';

export interface ShareLinkOptions {
  productId: string;
}

export function generateShareLink(options: ShareLinkOptions): string {
  const { productId } = options;
    // bytebasket://product/123
  return `bytebasket://product/${productId}`;
}

export interface ShareProductOptions {
  product: Product;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export async function shareProduct(options: ShareProductOptions): Promise<void> {
  const { product, onSuccess, onError } = options;

  try {
    const shareLink = generateShareLink({
      productId: product.id,
    });

    if (Platform.OS === 'web') {
      if (navigator.share) {
        await navigator.share({
          url: shareLink,
        });
        onSuccess && onSuccess();
      } else {
        await Clipboard.setStringAsync(shareLink);
        
        onSuccess && onSuccess();
      }
    } else {
      const result = await Share.share(
        {
          message: shareLink,
          url: Platform.OS === 'ios' ? shareLink : undefined,
        },
        {
          dialogTitle: 'Share Product', // Android dialog title
        }
      );

      if (result.action === Share.sharedAction) {
        onSuccess && onSuccess();
      } else if (result.action === Share.dismissedAction) {
        // if User dismissed the share dialog
      }
    }
  } catch (error) {
    onError && onError(error instanceof Error ? error : new Error('Failed to share product'));
  }
}

