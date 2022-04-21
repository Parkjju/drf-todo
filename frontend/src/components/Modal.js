import { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';

function CustomModal({ activeItem, onSave, toggle }) {
    const [currentItem, setCurrentItem] = useState(activeItem);

    const handleChange = (event) => {
        let { name, value } = event.target;
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }

        setCurrentItem({
            ...currentItem,
            [name]: value,
        });
    };

    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for='todo-title'>Title</Label>
                        <Input
                            type='text'
                            id='todo-title'
                            name='title'
                            value={currentItem.title}
                            onChange={handleChange}
                            placeholder='Enter Todo Title'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for='todo-description'>Description</Label>
                        <Input
                            type='text'
                            id='todo-description'
                            name='description'
                            value={currentItem.description}
                            onChange={handleChange}
                            placeholder='Enter Todo description'
                        />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type='checkbox'
                                name='completed'
                                checked={currentItem.completed}
                                onChange={handleChange}
                            />
                            Completed
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color='success' onClick={() => onSave(currentItem)}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default CustomModal;
