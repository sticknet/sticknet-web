import snakeize from './snakeize';

class CustomFormData extends FormData {
    append(key: string, value: any): void {
        super.append(snakeize(key), value);
    }
}

export default CustomFormData;
