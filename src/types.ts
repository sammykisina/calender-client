export interface Todo {
  id: number;
  icon: string;
  title: string;
  desc: string;
}

export interface Event {
  title: string;
  description: string;
  label: string | undefined;
  day: number;
  id: number;
}

export interface Activity {
  title: string;
  day: number;
  id: number;
  complete: boolean;
  label: string;
}

export interface ActivityLabel {
  label: string;
  checked: boolean;
}
