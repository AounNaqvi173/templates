import { Text } from '@/craftrn-ui/components/Text';
import React, { useCallback } from 'react';
import { TextStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type FormattedTextProps = {
  children: string;
  style?: TextStyle;
};

export const FormattedText = ({ children, style }: FormattedTextProps) => {
  const { styles } = useStyles(stylesheet);

  const parseContent = useCallback(() => {
    // Split by paragraphs first (double line breaks)
    const paragraphs = children.split('\n\n').filter(p => p.trim());

    return paragraphs.map((paragraph, paragraphIndex) => {
      const markdownRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`|~~.*?~~)/g;
      const segments = paragraph.split(markdownRegex);

      const parsedSegments = segments
        .map((segment, index) => {
          if (!segment) return null;

          if (segment.startsWith('**') && segment.endsWith('**')) {
            const content = segment.slice(2, -2);
            return (
              <Text key={index} variant="body2" style={styles.boldText}>
                {content}
              </Text>
            );
          } else if (
            segment.startsWith('*') &&
            segment.endsWith('*') &&
            !segment.startsWith('**')
          ) {
            const content = segment.slice(1, -1);
            return (
              <Text key={index} variant="body2" style={styles.italicText}>
                {content}
              </Text>
            );
          } else if (segment.startsWith('`') && segment.endsWith('`')) {
            const content = segment.slice(1, -1);
            return (
              <Text key={index} variant="body2" style={styles.codeText}>
                {` ${content} `}
              </Text>
            );
          } else if (segment.startsWith('~~') && segment.endsWith('~~')) {
            const content = segment.slice(2, -2);
            return (
              <Text
                key={index}
                variant="body2"
                style={styles.strikethroughText}
              >
                {content}
              </Text>
            );
          } else {
            // Handle single line breaks within paragraphs
            return segment
              .split('\n')
              .map((line, lineIndex) => (lineIndex > 0 ? '\n' + line : line))
              .join('');
          }
        })
        .filter(Boolean);

      return (
        <Text
          key={paragraphIndex}
          variant="body2"
          style={paragraphIndex > 0 ? styles.paragraphSpacing : undefined}
        >
          {parsedSegments}
          {paragraphIndex < paragraphs.length - 1 ? '\n\n' : ''}
        </Text>
      );
    });
  }, [children, styles]);

  return (
    <Text variant="body2" style={style} selectable>
      {parseContent()}
    </Text>
  );
};

const stylesheet = createStyleSheet(theme => ({
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  codeText: {
    fontFamily: 'SpaceMono',
    fontSize: 13,
    backgroundColor: theme.colors.surfacePrimary,
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
  },
  paragraphSpacing: {
    marginTop: theme.spacing.medium,
  },
}));
