"use client";

import { useContext, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { BASE_API_URL } from "@/index";
import UserContext from "@/lib/context/UserContext";

type Props = {
  activity: any;
  onSubmitSuccess: () => void;
};

function EditIncomeForm({ activity, onSubmitSuccess }: Props) {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const { mappedAccounts: accounts } = useContext(UserContext);

  const userId = session?.data?.user?.id;

  const [date, setDate] = useState<Date>(activity.date);
  const [submitting, setSubmitting] = useState(false);

  const addIncomeSchema = z.object({
    incomeName: z
      .string()
      .min(4, { message: "Income name should be atleast 4 characters" })
      .max(30, { message: "Income name should be less than 30 characters" }),
    date: z.date(),
    amount: z.coerce
      .number()
      .min(1, { message: "Income amount should be greater than 0" }),
    account: z.string(),
  });

  const form = useForm<z.infer<typeof addIncomeSchema>>({
    resolver: zodResolver(addIncomeSchema),
    defaultValues: {
      incomeName: activity.name,
      date: activity.date,
      amount: activity.amount,
      account: activity.accountId,
    },
  });

  const onSubmit = async (values: z.infer<typeof addIncomeSchema>) => {
    setSubmitting(true);
    try {
      const res = await fetch(`${BASE_API_URL}/api/income`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          incomeId: activity._id,
          userId: userId,
          newName: values.incomeName,
          newDate: values.date,
          newAmount: values.amount,
          newAccount: values.account,
        }),
      });

      const msg = await res.json();

      if (!res.ok) {
        setSubmitting(false);
        toast({
          description: msg.message,
          variant: "destructive",
        });
      }

      if (res.ok) {
        setSubmitting(false);
        toast({
          description: msg.message,
          variant: "success",
        });
        form.reset();
        router.refresh();
        setSubmitting(false);
        onSubmitSuccess();
      }
    } catch (error: any) {
      setSubmitting(false);
      throw new Error(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="incomeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger
                    asChild
                    className="dark:outline dark:outline-1"
                  >
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className=" w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={date}
                      onSelect={field.onChange}
                      onDayClick={setDate}
                      fromYear={2000}
                      toYear={2025}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue=""
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {accounts.length ? (
                      accounts.map((account: any) => (
                        <SelectItem
                          key={account._id}
                          value={account._id.toString()}
                          style={{ color: account.color }}
                        >
                          {account.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem
                        value="novalue"
                        disabled
                        className="flex items-center justify-center"
                      >
                        No accounts yet
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <span className="absolute ml-2">$</span>
                    <Input
                      {...field}
                      min={0}
                      type="number"
                      autoComplete="off"
                      className="pl-8"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? "Editing.." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EditIncomeForm;
