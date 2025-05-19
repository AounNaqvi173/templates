import { InputText } from '@/craftrn-ui/components/InputText';
import React, { useCallback, useRef, useState } from 'react';
import { Platform, TextInput } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const codeLength = 6;
const defaultCode = Array(codeLength).fill('');

export const OneTimeCodeInput = ({
  onChangeCode,
}: {
  onChangeCode: (text: string) => void;
}) => {
  const { styles } = useStyles(codeInputStylesheet);
  const inputRefs = useRef<TextInput[]>([]);
  const [code, setCode] = useState(defaultCode);

  const resetCode = useCallback(() => {
    setCode(defaultCode);
    onChangeCode('');
    setTimeout(() => inputRefs.current[0]?.focus(), 0);
  }, [onChangeCode]);

  const handleFocus = useCallback(
    (index: number) => {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    },
    [code],
  );

  const handleKeyPress = useCallback(
    (key: string, index: number) => {
      const newCode = [...code];

      if (key === 'Backspace' && index > 0) {
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
        return;
      }

      if (isNaN(parseInt(key, 10))) {
        return;
      }

      newCode[index] = key;
      setCode(newCode);

      if (index === codeLength - 1) {
        if (newCode.includes('')) {
          resetCode();
        } else {
          inputRefs.current[index].blur();
          onChangeCode(newCode.join(''));
        }
      } else {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [code, resetCode, onChangeCode],
  );

  return (
    <>
      {Array(codeLength)
        .fill(null)
        .map((_, index) => (
          <InputText
            key={index}
            keyboardType="numeric"
            autoFocus={index === 0}
            ref={ref => ref && (inputRefs.current[index] = ref)}
            onKeyPress={e => handleKeyPress(e.nativeEvent.key, index)}
            onPress={resetCode}
            onFocus={() => handleFocus(index)}
            style={styles.codeInputItem}
            value={code[index]}
            caretHidden
            maxLength={1}
            textContentType="oneTimeCode"
          />
        ))}
    </>
  );
};

const codeInputStylesheet = createStyleSheet(theme => ({
  codeInputItem: {
    ...theme.textVariants.heading3,
    width: 24,
    lineHeight: Platform.OS === 'ios' ? 0 : undefined,
    textAlign: 'center',
  },
}));
