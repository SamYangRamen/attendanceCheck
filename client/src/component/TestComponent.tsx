import { Alert, Button } from 'antd';
import { __String } from 'typescript';

const attendanceCheckButton: Map<
  string | undefined,
  { backgroundColor: string; borderColor: string }
> = new Map([
  [
    '0',
    {
      backgroundColor: 'green',
      borderColor: 'green',
    },
  ],
  [
    '1',
    {
      backgroundColor: 'yellow',
      borderColor: 'yellow',
    },
  ],
  [
    '2',
    {
      backgroundColor: 'red',
      borderColor: 'red',
    },
  ],
]);

const attendanceCheckButton2 = [
  {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  {
    backgroundColor: 'yellow',
    borderColor: 'yellow',
  },
  {
    backgroundColor: 'red',
    borderColor: 'red',
  },
];
const TestComponent: React.FC = () => {
  const v = 1;
  return (
    <div>
      <Button
        value="0"
        type="text"
        style={{ backgroundColor: attendanceCheckButton.get('0')?.backgroundColor }}
      >
        11
      </Button>
      <Alert
        message="test"
        type="success"
        style={{ position: 'relative' }}
        action={<Button type="text">nn</Button>}
      ></Alert>
    </div>
  );
};

export default TestComponent;
