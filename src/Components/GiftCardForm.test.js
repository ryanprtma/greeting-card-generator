import { render, screen, fireEvent} from "@testing-library/react";
import GiftCardForm from "./GiftCardForm";
import userEvent from "@testing-library/user-event";

jest.mock("react-dropzone", () => ({
    useDropzone: () => ({
        getRootProps: jest.fn(() => ({})),
        getInputProps: jest.fn(() => ({
            type: "file",
            multiple: false,
        })),
    })
}));

describe("GiftCardForm", () => {
    test("renders form elements correctly", () => {
        render(<GiftCardForm />);

        expect(screen.getByText(/Gift Card/i)).toBeInTheDocument();
        expect(screen.getByText(/Dear/i)).toBeInTheDocument();
        expect(screen.getByText(/Message/i)).toBeInTheDocument();
        expect(screen.getByText(/From/i)).toBeInTheDocument();
        expect(screen.getByText(/Download/i)).toBeInTheDocument();
    });

    test("updates input fields correctly", () => {
        render(<GiftCardForm />);

        const dearInput = screen.getByLabelText(/Dear/i);
        const messageInput = screen.getByLabelText(/Message/i);
        const fromInput = screen.getByLabelText(/From/i);

        fireEvent.change(dearInput, { target: { value: "John" } });
        fireEvent.change(messageInput, { target: { value: "Happy Birthday!" } });
        fireEvent.change(fromInput, { target: { value: "Jane" } });

        expect(dearInput.value).toBe("John");
        expect(messageInput.value).toBe("Happy Birthday!");
        expect(fromInput.value).toBe("Jane");
    });

    test("prevents message input from exceeding 54 characters", () => {
        render(<GiftCardForm />);

        const messageInput = screen.getByLabelText(/Message/i);
        const longMessage = "A".repeat(55);
        window.alert = jest.fn();

        fireEvent.change(messageInput, { target: { value: longMessage } });

        expect(window.alert).toHaveBeenCalledWith("Maximum message!");
    });

    test("uploads an image and updates the preview", async () => {
        render(<GiftCardForm />);

        const file = new File(["dummy content"], "test.png", { type: "image/png" });
        const fileInput = screen.getByLabelText(/File Upload/i);

        await userEvent.upload(fileInput, file);

        expect(fileInput.files[0]).toBe(file);
        expect(fileInput.files).toHaveLength(1);
    });

    test("downloads the gift card when clicking download button", () => {
        render(<GiftCardForm />);

        const downloadButton = screen.getByText(/Download/i);
        window.URL.createObjectURL = jest.fn();
        document.createElement = jest.fn(() => ({ click: jest.fn() }));

        fireEvent.click(downloadButton);
    });
});
