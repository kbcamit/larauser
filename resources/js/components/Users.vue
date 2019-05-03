<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0 text-dark">Users</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item active">Users</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">All Users</h3>
                                <div class="card-tools">
                                    <button type="button" class="btn btn-primary" @click="addNewUser">Add User</button>
                                </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body table-responsive p-0">
                                <table class="table table-hover">
                                    <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Type</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                    </tr>
                                    <tr v-for="(user,index) in users" :key="user.id">
                                        <td>{{ index+1 }}</td>
                                        <td>{{ user.name }}</td>
                                        <td>{{ user.email }}</td>
                                        <td>{{ user.type }}</td>
                                        <td>{{ user.created_at | myDate }}</td>
                                        <td>
                                            <a href="#" class="btn btn-primary btn-xs" @click="editUser(user)"
                                               data-toggle="tooltip"
                                               data-plcaement="top"
                                               data-original-title="Edit"><i class="fa fa-edit"></i></a>
                                            <a href="#" @click="deleteUser(user.id)"
                                               class="btn btn-danger btn-xs" data-toggle="tooltip" data-plcaement="top"
                                               data-original-title="Delete"><i class="fa fa-trash"></i></a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                </div>
            </div><!-- /.container-fluid -->
        </section>
        <!-- /.content -->


        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{ editMode ? 'Update' : 'Create' }} User</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editMode ? updateUser() : createUser()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input v-model="form.name" type="text" name="name" placeholder="Enter Name"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.email" type="email" name="email" placeholder="Enter Email"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.password" type="password" name="password"
                                       placeholder="Enter Password"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>
                            <div class="form-group">
                                <input v-model="form.bio" type="text" name="bio" placeholder="Enter Bio"
                                       class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <select v-model="form.type" name="type" class="form-control"
                                        :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="">--Select--</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">{{ editMode ? 'Update' : 'Create' }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Users",
        data() {
            return {
                editMode: false,
                users: {},
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods: {
            addNewUser() {
                this.editMode = false;
                this.form.reset();
                $('#exampleModal').modal('show');
            },
            editUser(user) {
                this.editMode = true;
                this.form.clear();
                this.form.fill(user);
                $('#exampleModal').modal('show');
            },
            createUser() {
                this.$Progress.start();
                this.form.post('api/user')
                    .then(() => {
                        Fire.$emit('AfterCreate');
                        $('#exampleModal').modal('hide');
                        Toast.fire({
                            type: 'success',
                            title: 'User created successfully'
                        })
                        this.$Progress.finish();
                    })
                    .catch(() => {

                    });
            },
            updateUser() {
                this.$Progress.start();
                this.form.put('api/user/' + this.form.id)
                    .then(() => {
                        Fire.$emit('AfterCreate');
                        $('#exampleModal').modal('hide');
                        Toast.fire({
                            type: 'success',
                            title: 'User updated successfully'
                        })
                        this.$Progress.finish();
                    })
                    .catch(() => {
                        Toast.fire({
                            type: 'warning',
                            title: 'User update failed'
                        })
                    });
            },
            deleteUser(id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        this.form.delete('api/user/' + id)
                            .then(() => {
                                Swal.fire(
                                    'Deleted!',
                                    'Your file has been deleted.',
                                    'success'
                                )
                                Fire.$emit('AfterCreate');
                            })
                            .catch(() => {
                                Swal.fire(
                                    '',
                                    'Something wrong',
                                    'warning'
                                )
                            })
                    }
                })
            },
            loadUsers() {
                axios.get('api/user')
                    .then(({data}) => (this.users = data.data));
            }
        },
        created() {
            this.loadUsers();
            //setInterval(() => this.loadUsers(), 3000);
            Fire.$on('AfterCreate', () => {
                this.loadUsers();
            });
        }
    }
</script>

<style scoped>

</style>
